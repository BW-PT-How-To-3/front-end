import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const PasswordToggle = () => {
    const [visible, setVisible] = useState(false);

    const visibleIcon = (
        <FontAwesomeIcon 
            icon={ visible ? 'eye-slash' : 'eye' }
            onClick={() => setVisible(visibility => !visibility)}
        />
    )

    const inputType = visible ? 'text' : 'password'
    return [inputType, visibleIcon];
}

export default PasswordToggle;