// eslint-disable-next-line import/no-namespace -- needed for dependency
import * as html2pdf from "html2pdf.js";

/**
 * Utility function for generating pdf document from html passed in
 *
 * @param document The html to render into a pdf
 * @returns void
 */
export const uploadDocument = (document?: HTMLElement | HTMLSpanElement | null): void => html2pdf(document);
