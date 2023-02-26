import React, {useMemo} from "react";
import {MaskedInput} from "antd-mask-input";

export default function DynamicDocument(props){
    const cpf = '000.000.000-00';
    const rg = '00.000.000-0';

    const mask = useMemo(
        () => [
            {
                mask: cpf,
                lazy: true,
            },
            {
                mask: rg,
                lazy: true,
            },
        ],
        []
    );

    return (
        <MaskedInput
            {...props}
            mask={mask}
            maskOptions={{
                dispatch: function (appended, dynamicMasked) {
                    const isCPF = props.id === 'cpf';
                    return dynamicMasked.compiledMasks[isCPF ? 0 : 1];
                },
            }}
        />
    );
};