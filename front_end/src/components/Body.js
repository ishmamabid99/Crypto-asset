import React from 'react'

export default function Body({ children, body }) {
    return (
        <header className={body}>
           {children} 
        </header>
    )
}
Body.defaultProps = {
    body: 'defaultBody'
}
