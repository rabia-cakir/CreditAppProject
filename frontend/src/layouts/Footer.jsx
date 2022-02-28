import React from 'react'

export default function Footer() {
    return (
        <div style={{ marginTop: '100px'}}>
            <div className='text-center p-3 text-primary'>
                <p> All Rights Reserved - {new Date().getFullYear()} </p>
            </div>
        </div>
    )
}
