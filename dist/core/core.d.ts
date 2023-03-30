import { TitleTag } from "../title-tag";
import { TitleRecord } from "../title-record";
import { LicenseUse } from "../license-use";
import { LicenseRecord } from "../license-record";
import { LicenseUsecase } from "../license-usecase";
export declare function address(): string;
export declare function id(): string;
export declare function isInitialized(): boolean;
export declare function title(ptr: string, tags?: Array<TitleTag>, description?: string, origin?: string): Promise<TitleRecord>;
export declare function license(ptr: string, uses: Array<LicenseUse>, terms: string, tags?: Array<TitleTag>, licenseDescription?: string, expiry?: Date, titleDescription?: string, origin?: string): Promise<LicenseRecord>;
export declare function getTitle(id: string): TitleRecord | undefined;
export declare function getLicense(id: string): LicenseRecord | undefined;
export declare function all(ptr: string, origin?: string): Array<LicenseRecord>;
export declare function latest(ptr: string, origin?: string): LicenseRecord | undefined;
export declare function guard(ptr: string, usecases: Array<LicenseUsecase>, destinations?: Array<string>, onPass?: () => void, onFail?: (reason: string) => void, origin?: string): boolean;
