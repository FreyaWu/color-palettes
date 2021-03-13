import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

export default function LikeButton({likes}) {
    console.log(likes);

    return (
        <Button variant="danger"> {likes}</Button>
    );
}