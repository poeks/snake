import React from 'react';
import './Field.css';


function Field() {

    const food = String.fromCodePoint(0x1F34E); // Apple

    return (
    <table className='field'>
        <tbody>
            <tr>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
            </tr>
            <tr>
                <td className='light'></td>
                <td className='dark'></td>
                <td className='dark'></td>
                <td className='dark'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
            </tr>
            <tr>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='dark'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
            </tr>
            <tr>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
            </tr>
            <tr>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'>{food}</td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
            </tr>
            <tr>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
            </tr>
            <tr>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
                <td className='light'></td>
            </tr>
        </tbody>
    </table>
    )
}

export default Field;
