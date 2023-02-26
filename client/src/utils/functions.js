import {getMessage} from "../i18n";

export function onlyNumbers(string) {
    return string.replace(/[^0-9]/g,'');
}

export const messageNotDataColumnTable = (data, message) => data || message || getMessage("comum.table.column.notData")