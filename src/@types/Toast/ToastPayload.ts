import type { AVAILABLE_VARIANTS } from "src/helpers/GeneratedToast";

/**
 * Type of object that will be passed when rendering an notification
 */
export type ToastPayload = {
	message: string;
	header?: string;
	variant: AVAILABLE_VARIANTS;
	delay?: number;
};
