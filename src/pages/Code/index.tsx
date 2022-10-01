import React from "react";

import QRCodeCanvas from "#/components/QRCodeCanvas";

const Code: React.FC = () => {
    return (
        <div>
            <QRCodeCanvas text={'https://github.com/analuciabolico'} />
        </div>
    );
};

export default Code;
