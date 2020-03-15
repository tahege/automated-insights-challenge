import React from 'react';

export default function Modal ({
    title = null,
    children,
    footer = null,
    active = false,
    onClose = null
}) {
    return (
    <div className={"modal" + (active ? " is-active" : "")}>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">{title}</p>
                {onClose ?
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={onClose}
                    ></button>
                    :
                    null
                }
            </header>
            <section className="modal-card-body">
                {children}
            </section>
            <footer className="modal-card-foot">
                {footer}
            </footer>
        </div>
    </div>
  )
}