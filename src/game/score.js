import React from "react";
const Score = (props) => {
    const he=props.visible;
    const index=props.index
    let visible={
        opacity: `${he}%`,
    }
    return (
        <div className="scoreBox" style={visible}>
            <h1>Score</h1>
            <button type="button" onClick={props.Goback}>Back</button>
            <div className="scrollable">
                <table>
                    <tbody>
                        <tr>
                            <th>Kissel James</th>
                            <td>TOP 1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Score;
