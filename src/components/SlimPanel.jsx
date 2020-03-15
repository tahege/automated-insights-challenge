import React from 'react';

export default function SlimPanel ({
    className = "",
    children = null,
    title = ""
}) {
    return (
        <div className={`slim-panel ${className}`}>
            <div className="inner">
                {children}
            </div>
            {title ?
                <div className="inner-title">
                    <span>{title}</span>
                </div>
                :
                null
            }
        </div>
    );
}