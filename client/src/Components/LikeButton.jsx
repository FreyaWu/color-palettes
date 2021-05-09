import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

export default function LikeButton({ likes }) {

    return (
        <Button variant="danger"> {likes}</Button>
    );
}