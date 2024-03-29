/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./tiki-wrapper.cjs";
import { flow } from "./ui/flow";
import { FlowStep } from "./ui/flow-step";
import { Config } from "./config";

/**
 * The TikiSdk entrypoint.
 * Use this to add tokenized data ownership, consent, and rewards.
 * Learn more at [mytiki.com](https://mytiki.com)
 *
 * @packageDocumentation
 */

export { Config } from "./config";
export * as UI from "./ui/ui";
export * as Trail from "./trail/trail";
export * as IDP from "./idp/idp";

/**
 * @hidden
 */
const _config = new Config();

/**
 * Presents an {@link UI.Offer} to the user and allows them to accept or decline it. Acceptance results in
 * a new {@link Trail.License.LicenseRecord} being created based on the presented Offer.
 *
 * If the Offer has already been accepted by the user, this method does nothing.
 *
 * This method executes TIKI's pre-built UI for the Offer, temporarily adding a new `Div` as a `childNode` to the
 * `window.document.body` as a popup over your application. A user click outside the popup will automatically
 * dismiss the offer flow.
 *
 * @throws Error if the SDK is not initialized.
 */
export function present() {
  if (isInitialized()) flow(FlowStep.prompt, _config);
  else
    throw new Error(
      "Cannot present(). Wait for TIKI SDK initialization to complete."
    );
}

/**
 * Presents the TIKI pre-built UI for the settings screen, which allows the user to accept or decline
 * the current offer.
 *
 * This method temporarily adds a new `Div` as a `childNode` to the `window.document.body` as a popup over your
 * application. A user click outside the popup will automatically dismiss the offer flow.
 *
 * @throws Error if the SDK is not initialized.
 */
export function settings() {
  if (isInitialized()) flow(FlowStep.settings, _config);
  else
    throw new Error(
      "Cannot present(). Wait for TIKI SDK initialization to complete."
    );
}

/**
 * Starts the configuration process for the Tiki SDK.
 *
 * This method returns the shared instance of {@link Config}, which can be used to configure the SDK before
 * initializing it. You can access child configurations such as {@link UI.Theme} or {@link UI.Offer}, and call methods
 * such as {@link Config.disableAcceptEnding} and {@link Config.onAccept} on the returned instance to
 * customize the SDK behavior to your needs.
 *
 * After the configuration is complete, you initialize the SDK by calling {@link Config.initialize}.
 *
 * To configure the Tiki SDK, you can use the builder pattern and chain the methods to customize the SDK
 * behavior as needed. Here's an example:
 *
 * ```
 * TikiSdk.config()
 *    .theme
 *        .primaryTextColor('#000000')
 *        .primaryBackgroundColor('#FFFFFF')
 *        .accentColor('green')
 *        .and()
 *    .dark
 *        .primaryTextColor('white')
 *        .primaryBackgroundColor('black')
 *        .accentColor('green')
 *        .and()
 *    .offer
 *        .bullet({ text: 'Use for ads', isUsed: true })
 *        .bullet({ text: 'Share with 3rd party', isUsed: false })
 *        .bullet({ text: 'Sell to other companies', isUsed: true })
 *        .ptr('offer1')
 *        .use({ usecases: [TikiSdk.LicenseUsecase.custom('example')] })
 *        .tag(TitleTag(TitleTagEnum.advertisingData))
 *        .duration(365 * 24 * 60 * 60)
 *        .terms('./terms.md')
 *        .add()
 *    .onAccept ((offer, license) => console.log('accepted))
 *    .onDecline ((offer, license) => console.log('declined))
 *    .disableAcceptEnding(false)
 *    .disableDeclineEnding(true)
 *    .initialize('publishingId', 'userId')
 * ```
 */
export function config(): Config {
  return _config;
}

/**
 * Returns a Boolean value indicating whether the TikiSdk has been initialized.
 *
 * If `true`, it means that the TikiSdk has been successfully initialized.
 * If `false`, it means that the TikiSdk has not yet been initialized or has failed to initialize.
 */
export function isInitialized(): boolean {
  const json: string = globalThis.___TikiWrapper__isInitialized();
  const rsp: RspIsInitialized = JSON.parse(json);
  return rsp.isInitialized;
}
