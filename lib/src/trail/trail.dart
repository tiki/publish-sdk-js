/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'package:http/http.dart' as http;
import 'package:js/js.dart';
import 'package:sqlite3/wasm.dart';
import 'package:tiki_idp/tiki_idp.dart';
import 'package:tiki_trail/key.dart';
import 'package:tiki_trail/tiki_trail.dart';

import 'req/req_get_license.dart';
import 'req/req_get_license_id.dart';
import 'req/req_get_licenses.dart';
import 'req/req_get_payable_id.dart';
import 'req/req_get_payables.dart';
import 'req/req_get_receipt_id.dart';
import 'req/req_get_receipts.dart';
import 'req/req_get_title.dart';
import 'req/req_get_title_id.dart';
import 'req/req_guard.dart';
import 'req/req_license.dart';
import 'req/req_payable.dart';
import 'req/req_receipt.dart';
import 'req/req_title.dart';
import 'rsp/rsp_address.dart';
import 'rsp/rsp_guard.dart';
import 'rsp/rsp_id.dart';
import 'rsp/rsp_license.dart';
import 'rsp/rsp_payable.dart';
import 'rsp/rsp_receipt.dart';
import 'rsp/rsp_title.dart';

@JS('___TikiTrail__address')
external set _address(String Function() f);

@JS('___TikiTrail__id')
external set _id(String Function() f);

@JS('___TikiTrail__title')
external set _title(void Function(String json, Function(String) onComplete) f);

@JS('___TikiTrail__getTitle')
external set _getTitle(String? Function(String id) f);

@JS('___TikiTrail__getTitleById')
external set _getTitleById(String? Function(String id) f);

@JS('___TikiTrail__license')
external set _license(
    void Function(
            String json, Function(String) onComplete, Function(String) onError)
        f);

@JS('___TikiTrail__getLicenses')
external set _getLicenses(List<String> Function(String id) f);

@JS('___TikiTrail__getLicense')
external set _getLicense(String? Function(String id) f);

@JS('___TikiTrail__getLicenseById')
external set _getLicenseById(String? Function(String id) f);

@JS('___TikiTrail__payable')
external set _payable(
    void Function(
            String json, Function(String) onComplete, Function(String) onError)
        f);

@JS('___TikiTrail__getPayables')
external set _getPayables(List<String> Function(String json) f);

@JS('___TikiTrail__getPayableById')
external set _getPayableById(String? Function(String json) f);

@JS('___TikiTrail__receipt')
external set _receipt(
    void Function(
            String json, Function(String) onComplete, Function(String) onError)
        f);

@JS('___TikiTrail__getReceipts')
external set _getReceipts(List<String> Function(String json) f);

@JS('___TikiTrail__getReceiptById')
external set _getReceiptById(String? Function(String json) f);

@JS('___TikiTrail__guard')
external set _guard(String Function(String json) f);

class Trail {
  TikiTrail? _tikiTrail;

  Trail() {
    _address = allowInterop(() => address);
    _id = allowInterop(() => id);

    _title = allowInterop(title);
    _getTitle = allowInterop(getTitle);
    _getTitleById = allowInterop(getTitleById);

    _license = allowInterop(license);
    _getLicenses = allowInterop(getLicenses);
    _getLicense = allowInterop(getLicense);
    _getLicenseById = allowInterop(getLicenseById);

    _payable = allowInterop(payable);
    _getPayables = allowInterop(getPayables);
    _getPayableById = allowInterop(getPayableById);

    _receipt = allowInterop(receipt);
    _getReceipts = allowInterop(getReceipts);
    _getReceiptById = allowInterop(getReceiptById);

    _guard = allowInterop(guard);
  }

  Future<void> initialize(String id, String publishingId, TikiIdp idp,
      {String? origin}) async {
    Key key = await TikiTrail.withId(id, idp);
    final http.Response response = await http
        .get(Uri.parse('https://cdn.mytiki.com/sqlite/1.10.0/sqlite3.wasm'));
    final IndexedDbFileSystem fs =
        await IndexedDbFileSystem.open(dbName: "TikiSdk.sqlite");
    WasmSqlite3 sqlite3 = await WasmSqlite3.load(
        response.bodyBytes, SqliteEnvironment(fileSystem: fs));
    _tikiTrail = await TikiTrail.init(publishingId, origin ?? Uri.base.host,
        idp, key, sqlite3.open("${key.address}.db"));
  }

  String get address => RspAddress(_tikiTrail!.address).toJson();

  String get id => RspId(_tikiTrail!.id).toJson();

  bool isInitialized() => _tikiTrail != null;

  void title(String json, Function(String)? onComplete) async {
    ReqTitle req = ReqTitle.fromJson(json);
    TitleRecord title = await _tikiTrail!.title.create(req.ptr,
        origin: req.origin, tags: req.tags, description: req.description);
    if (onComplete != null) onComplete(RspTitle(title).toJson());
  }

  String? getTitle(String json) {
    ReqGetTitle req = ReqGetTitle.fromJson(json);
    TitleRecord? title = _tikiTrail!.title.get(req.ptr, origin: req.origin);
    return title == null ? null : RspTitle(title).toJson();
  }

  String? getTitleById(String json) {
    ReqGetTitleId req = ReqGetTitleId.fromJson(json);
    TitleRecord? title = _tikiTrail!.title.id(req.id);
    return title == null ? null : RspTitle(title).toJson();
  }

  void license(String json, Function(String) onComplete,
      Function(String) onError) async {
    ReqLicense req = ReqLicense.fromJson(json);
    TitleRecord? title = _tikiTrail!.title.id(req.titleId);
    if (title == null) {
      onError("Cannot create license. Title required.");
      return;
    }
    LicenseRecord license = await _tikiTrail!.license.create(
        title, req.uses, req.terms,
        expiry: req.expiry, description: req.description);
    onComplete(RspLicense(license).toJson());
  }

  List<String> getLicenses(String json) {
    ReqGetLicenses req = ReqGetLicenses.fromJson(json);
    TitleRecord? title = _tikiTrail!.title.id(req.titleId);
    if (title == null) return List.empty();
    List<LicenseRecord> licenses = _tikiTrail!.license.all(title);
    return licenses.map((license) => RspLicense(license).toJson()).toList();
  }

  String? getLicense(String json) {
    ReqGetLicense req = ReqGetLicense.fromJson(json);
    TitleRecord? title = _tikiTrail!.title.id(req.titleId);
    if (title == null) return null;
    LicenseRecord? license = _tikiTrail!.license.latest(title);
    return license == null ? null : RspLicense(license).toJson();
  }

  String? getLicenseById(String json) {
    ReqGetLicenseId req = ReqGetLicenseId.fromJson(json);
    LicenseRecord? license = _tikiTrail!.license.get(req.id);
    return license == null ? null : RspLicense(license).toJson();
  }

  void payable(String json, Function(String) onComplete,
      Function(String) onError) async {
    ReqPayable req = ReqPayable.fromJson(json);
    LicenseRecord? license = _tikiTrail!.license.get(req.licenseId);
    if (license == null) {
      onError("Cannot create payable. Missing license record.");
      return;
    }
    PayableRecord? payable = await _tikiTrail!.payable.create(
        license, req.amount, req.type,
        expiry: req.expiry,
        description: req.description,
        reference: req.reference);
    onComplete(RspPayable(payable).toJson());
  }

  List<String> getPayables(String json) {
    ReqGetPayables req = ReqGetPayables.fromJson(json);
    LicenseRecord? license = _tikiTrail!.license.get(req.licenseId);
    if (license == null) return List.empty();
    List<PayableRecord> payables = _tikiTrail!.payable.all(license);
    return payables.map((payable) => RspPayable(payable).toJson()).toList();
  }

  String? getPayableById(String json) {
    ReqGetPayableId req = ReqGetPayableId.fromJson(json);
    PayableRecord? payable = _tikiTrail!.payable.get(req.id);
    return payable == null ? null : RspPayable(payable).toJson();
  }

  void receipt(String json, Function(String) onComplete,
      Function(String) onError) async {
    ReqReceipt req = ReqReceipt.fromJson(json);
    PayableRecord? payable = _tikiTrail!.payable.get(req.payableId);
    if (payable == null) {
      onError("Cannot create receipt. Missing payable record.");
      return;
    }
    ReceiptRecord? receipt = await _tikiTrail!.receipt.create(
        payable, req.amount,
        description: req.description, reference: req.reference);
    onComplete(RspReceipt(receipt).toJson());
  }

  List<String> getReceipts(String json) {
    ReqGetReceipts req = ReqGetReceipts.fromJson(json);
    PayableRecord? payable = _tikiTrail!.payable.get(req.payableId);
    if (payable == null) return List.empty();
    List<ReceiptRecord> receipts = _tikiTrail!.receipt.all(payable);
    return receipts.map((receipt) => RspReceipt(receipt).toJson()).toList();
  }

  String? getReceiptById(String json) {
    ReqGetReceiptId req = ReqGetReceiptId.fromJson(json);
    ReceiptRecord? receipt = _tikiTrail!.receipt.get(req.id);
    return receipt == null ? null : RspReceipt(receipt).toJson();
  }

  String guard(String json) {
    ReqGuard req = ReqGuard.fromJson(json);
    RspGuard rsp = RspGuard(false);
    _tikiTrail!.guard(req.ptr, req.usecases,
        destinations: req.destinations,
        origin: req.origin,
        onPass: () => rsp = RspGuard(true),
        onFail: (error) => rsp = RspGuard(false, error: error));
    return rsp.toJson();
  }
}
