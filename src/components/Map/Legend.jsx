// Legend.jsx
import React, { useState } from 'react';
import './Legend.css'; // Import the CSS for styling the legend

const Legend = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isInfoExpanded, setIsInfoExpanded] = useState(false); // State for the second collapsible list

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleInfoExpand = () => {
        setIsInfoExpanded(!isInfoExpanded);
    };

    return (
        <div className="map-legend">
            <table className="legend-table">
                <tbody>
                    {/* User Location Icon */}
                    <tr className="legend-item">
                        <td className="legend-icon" style={{ fontSize: '20px', color: 'black' }}>
                            <i className="fa-solid fa-circle-user"></i>
                        </td>
                        <td className="legend-label">Lokalizacja Użytkownika</td>
                    </tr>

                    {/* Weather Station Icon */}
                    <tr className="legend-item">
                        <td className="legend-icon" style={{ fontSize: '20px', color: '#FD287D' }}>
                            <i className="fa-solid fa-cloud"></i>
                        </td>
                        <td className="legend-label">Stacja Pogodowa</td>
                    </tr>

                    {/* Hydrological Station Icon */}
                    <tr className="legend-item">
                        <td className="legend-icon" style={{ fontSize: '20px', color: '#0686AD' }}>
                            <i className="fa-solid fa-droplet"></i>
                        </td>
                        <td className="legend-label">Stacja Hydrologiczna</td>
                    </tr>

                    {/* Air Pollution Station Icon */}
                    <tr className="legend-item">
                        <td className="legend-icon" style={{ fontSize: '20px', color: 'black' }}>
                            <i className="fa-solid fa-location-dot"></i>
                        </td>
                        <td className="legend-label">Stacja Zanieczyszczeń Powietrza</td>
                    </tr>

                    {/* Collapsible Air Quality Levels */}
                    <tr className="legend-item collapsible-header" onClick={toggleExpand}>
                        <td className="legend-icon"></td> {/* Empty cell */}
                        <td className="legend-label collapsible-label">
                            <i className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            <span className="collapsible-title">Ogólne indeksy jakości powietrza</span>
                        </td>
                    </tr>

                    {isExpanded && (
                        <>
                            {/* Air Quality Levels */}
                            {[
                                { color: '#0D5504', label: 'Bardzo Dobry' },
                                { color: '#14A302', label: 'Dobry' },
                                { color: '#BAA809', label: 'Umiarkowany' },
                                { color: '#DB7909', label: 'Dostateczny' },
                                { color: '#D4150B', label: 'Zły' },
                                { color: '#900C05', label: 'Bardzo Zły' },
                                { color: '#343434', label: 'Nieznany' },
                            ].map((level, index) => (
                                <tr className="legend-item indented" key={index}>
                                    <td className="legend-icon"></td> {/* Empty cell */}
                                    <td className="legend-label">
                                        <span className="indented-content">
                                            <i
                                                className="fa-solid fa-location-dot"
                                                style={{ fontSize: '16px', color: level.color, paddingRight: '8px' }}
                                            ></i>
                                            {level.label}
                                        </span>
                                    </td>
                                </tr>
                            ))}

                            {/* More Information Link */}
                            <tr className="legend-item indented">
                                <td className="legend-icon"></td>
                                <td className="legend-label">
                                    <span className="indented-content">
                                        <a
                                            href="https://powietrze.gios.gov.pl/pjp/content/content_image/2831" // Replace with actual link
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="air-quality-link"
                                        >
                                            więcej informacji
                                        </a>
                                    </span>
                                </td>
                            </tr>
                        </>
                    )}

                    {/* Second Collapsible List - More Information */}
                    <tr className="legend-item collapsible-header" onClick={toggleInfoExpand}>
                        <td className="legend-icon"></td> {/* Empty cell */}
                        <td className="legend-label collapsible-label info-collapsible-label">
                            <i className={`fa-solid ${isInfoExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            <span className="collapsible-title">Żródła</span>
                        </td>
                    </tr>

                    {isInfoExpanded && (
                        <>
                            {/* Link 1 */}
                            <tr className="legend-item indented" key="link1">
                                <td className="legend-icon"></td>
                                <td className="legend-label">
                                    <a
                                        href="https://www.example1.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="indented-link"
                                    >
                                        Strona 1
                                    </a>
                                </td>
                            </tr>

                            {/* Link 2 */}
                            <tr className="legend-item indented" key="link2">
                                <td className="legend-icon"></td>
                                <td className="legend-label">
                                    <a
                                        href="https://www.example2.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="indented-link"
                                    >
                                        Strona 2
                                    </a>
                                </td>
                            </tr>

                            {/* Link 3 */}
                            <tr className="legend-item indented" key="link3">
                                <td className="legend-icon"></td>
                                <td className="legend-label">
                                    <a
                                        href="https://www.example3.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="indented-link"
                                    >
                                        Strona 3
                                    </a>
                                </td>
                            </tr>

                            {/* Link 4 */}
                            <tr className="legend-item indented" key="link4">
                                <td className="legend-icon"></td>
                                <td className="legend-label">
                                    <a
                                        href="https://www.example4.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="indented-link"
                                    >
                                        Strona 4
                                    </a>
                                </td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Legend;
