/* eslint-disable @typescript-eslint/no-redundant-type-constituents -- disabled */
import React from "react";
import type { iFilesContext } from "src/@types";

export const FilesContext: React.Context<iFilesContext | undefined> = React.createContext<
	iFilesContext | undefined
>(undefined);
