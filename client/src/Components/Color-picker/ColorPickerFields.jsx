import React from 'react';
import { EditableInput } from 'react-color/lib/components/common'
// import colorUtil from '../../utils/color';
import styled, { isStyledComponent } from 'styled-components';
import colorUtil from '../../utils/color';

const SingleWeightInput = styled.div`
    flex: 1;
    padding-left: 6px;
    
`;

const DoubleWeightInput = styled.div`
    flex: 2;
`;

function ColorPickerFields({
    rgb,
    hsl,
    hex,
    onChange
}) {

    const styles = {
        input: {
            width: '80%',
            padding: '4px 10% 3px',
            border: 'none',
            boxShadow: 'inset 0 0 0 1px #ccc',
        },
        label: {
            display: 'block',
            textAlign: 'center',
            color: '#222',
            paddingTop: '3px',
            paddingBottom: '4px',
            textTransform: 'capitalize',
        },
    }

    const handleChange = (data, e) => {
        if (data.hex) {
            colorUtil.isValidHex(data.hex) && onChange({
                hex: data.hex,
                source: 'hex',
            }, e)
        } else if (data.r || data.g || data.b) {
            onChange({
                r: data.r || rgb.r,
                g: data.g || rgb.g,
                b: data.b || rgb.b,
                a: rgb.a,
                source: 'rgb',
            }, e)
        } else if (data.a) {
            if (data.a < 0) {
                data.a = 0
            } else if (data.a > 100) {
                data.a = 100
            }

            data.a /= 100
            onChange({
                h: hsl.h,
                s: hsl.s,
                l: hsl.l,
                a: data.a,
                source: 'rgb',
            }, e)
        }
    }

    return (
        <div className="d-flex">
            <DoubleWeightInput>
                <EditableInput
                    style={{ input: styles.input, label: styles.label }}
                    label="hex"
                    value={hex}
                    onChange={handleChange}
                />
            </DoubleWeightInput>
            <SingleWeightInput>
                <EditableInput
                    style={{ input: styles.input, label: styles.label }}
                    label="r"
                    value={rgb.r}
                    onChange={handleChange}
                    dragLabel="true"
                    dragMax="255"
                />
            </SingleWeightInput>
            <SingleWeightInput>
                <EditableInput
                    style={{ input: styles.input, label: styles.label }}
                    label="g"
                    value={rgb.g}
                    onChange={handleChange}
                    dragLabel="true"
                    dragMax="255"
                />
            </SingleWeightInput>
            <SingleWeightInput>
                <EditableInput
                    style={{ input: styles.input, label: styles.label }}
                    label="b"
                    value={rgb.b}
                    onChange={handleChange}
                    dragLabel="true"
                    dragMax="255"
                />
            </SingleWeightInput>
            <SingleWeightInput>
                <EditableInput
                    style={{ input: styles.input, label: styles.label }}
                    label="a"
                    value={Math.round(rgb.a * 100)}
                    onChange={handleChange}
                    dragLabel="true"
                    dragMax="100"
                />
            </SingleWeightInput>
        </div>
    )
}

export default ColorPickerFields;