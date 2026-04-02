import React from 'react';

const AdminHiddenNodes = ({ onLeft, onRight }) => {
    return (
        <>
            <div
                onClick={onLeft}
                className="fixed top-0 left-0 w-[50px] h-[50px] opacity-0 z-[10000] cursor-default bg-transparent"
                title="Node A"
            />
            <div
                onClick={onRight}
                className="fixed top-0 right-0 w-[50px] h-[50px] opacity-0 z-[10000] cursor-default bg-transparent"
                title="Node B"
            />
        </>
    );
};

export default AdminHiddenNodes;
