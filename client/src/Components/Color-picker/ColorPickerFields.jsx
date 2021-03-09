import React from 'react';
import { EditableInput } from 'react-color/lib/components/common'
// import colorUtil from '../../utils/color';
import styled, { isStyledComponent } from 'styled-components';

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

    return (
        <div className="d-flex">
            <DoubleWeightInput>
                <EditableInput
                    style={{ input: styles.input, label: styles.label }}
                    label="hex"
                    value={hex}
                    onChange={onChange}
                />
            </DoubleWeightInput>
            <SingleWeightInput>
                <EditableInput
                    style={{ input: styles.input, label: styles.label }}
                    label="r"
                    value={rgb.r}
                    onChange={onChange}
                    dragLabel="true"
                    dragMax="255"
                />
            </SingleWeightInput>
            <SingleWeightInput>
                <EditableInput
                    style={{ input: styles.input, label: styles.label }}
                    label="g"
                    value={rgb.g}
                    onChange={onChange}
                    dragLabel="true"
                    dragMax="255"
                />
            </SingleWeightInput>
            <SingleWeightInput>
                <EditableInput
                    style={{ input: styles.input, label: styles.label }}
                    label="b"
                    value={rgb.b}
                    onChange={onChange}
                    dragLabel="true"
                    dragMax="255"
                />
            </SingleWeightInput>
            <SingleWeightInput>
                <EditableInput
                    style={{ input: styles.input, label: styles.label }}
                    label="a"
                    value={Math.round(rgb.a*100)}
                    onChange={onChange}
                    dragLabel="true"
                    dragMax="100"
                />
            </SingleWeightInput>
        </div>
    )
}

export default ColorPickerFields;