/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'package:test/test.dart';
import 'package:tiki_sdk_js/src/trail/req/req_license.dart';
import 'package:tiki_sdk_js/src/trail/req/req_title.dart';

void main() {
  group('Req Marshall Tests', () {
    test('ReqLicense.fromJson', () {
      String json =
          '{"titleId":"test-id","uses":[{"usecases":["custom:test usecase"]}],"terms":"test terms"}';
      ReqLicense req = ReqLicense.fromJson(json);
      expect(req.titleId, "test-id");
      expect(req.uses.length, 1);
      expect(req.uses[0].usecases[0].value, "custom:test usecase");
      expect(req.uses[0].destinations, null);
      expect(req.terms, "test terms");
    });

    test('ReqTitle.fromJson', () {
      String json = '{"ptr":"test-ptr","tags":["custom:test tag"]}';
      ReqTitle req = ReqTitle.fromJson(json);
      expect(req.ptr, "test-ptr");
      expect(req.tags.length, 1);
      expect(req.tags[0].value, "custom:test tag");
    });
  });
}
