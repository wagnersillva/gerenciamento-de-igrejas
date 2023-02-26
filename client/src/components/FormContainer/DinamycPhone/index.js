import React, {useMemo} from "react";
import {MaskedInput} from "antd-mask-input";

export default function DynamicPhone(props){
    const cellphoneMask = '(00) 00000-0000';
    const phoneMask = '(00) 0000-0000';

    const mask = useMemo(
        () => [
            {
                mask: cellphoneMask,
                lazy: true,
            },
            {
                mask: phoneMask,
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
                    const isCellPhone = dynamicMasked.unmaskedValue[2] === '9';
                    return dynamicMasked.compiledMasks[isCellPhone ? 0 : 1];
                },
            }}
        />
    );
};