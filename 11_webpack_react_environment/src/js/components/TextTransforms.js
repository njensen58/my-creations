import React from 'react';
import MdFormatUnderlined from 'react-icons/lib/md/format-underlined';
import MdFormatBold from 'react-icons/lib/md/format-bold';
import MdFormatItalic from 'react-icons/lib/md/format-italic';
import MdFontDownload from 'react-icons/lib/md/font-download';
import MdImportExport from 'react-icons/lib/md/import-export'

const TextTransforms = ({ handleTextEdit }) => {
    return (
        <div className="textTransformBtns">
            <div
                onClick={ ()=>handleTextEdit("textDecoration", "underline", "none") }>
                <MdFormatUnderlined />
            </div>
            <div
                onClick={ ()=>handleTextEdit("fontWeight", "bold", "400") }>
                <MdFormatBold />
            </div>
            <div
                onClick={ ()=>handleTextEdit("fontStyle", "italic", "normal") }>
                <MdFormatItalic />
            </div>
            <div
                onClick={ ()=>handleTextEdit("textTransform", "uppercase", "lowercase") }>
                <MdFontDownload />
            </div>
            <div onClick={ ()=>handleTextEdit("transform", "rotateX(180deg)", "rotateX(360deg)") }>
                <MdImportExport />
            </div>
        </div>
    )
}

export default TextTransforms;
