import React, {useState, useRef} from "react";
import logo from './logo.svg';
import MaskInput from 'react-maskinput';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import moment from "moment"

import {Table, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

function renderTooltip(props) {
    return (
        <Tooltip id="button-tooltip" {...props}>
            Copied!
        </Tooltip>
    );
}
function compareWithZero(matrix, i, j) {
    return matrix[i][j] === '-' || matrix[i][j] === 0 ? 0 : matrix[i][j];
}

function extractSumDigits(temp1, temp2, temp3) {
    return (temp1 + temp2 + temp3) <= 0 ? '-' : (temp1 + temp2 + temp3).toString().replace(/0/g, "").length;
}

class CustomTable extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {

        const primaryNumbers = this.props.primaryNumbers;
        const birthday = this.props.birthday;
        const fateNumber = this.props.fateNumber;
        const temperamentNumber = this.props.temperamentNumber;
        const goalNum = this.props.goalNumber;
        const famNum = this.props.famNumber;
        const habbitNum = this.props.habbNum;
        const bytNum = this.props.bytNum;

        return (
            <Table variant="dark" bordered responsive>
                <tbody>
                <tr>
                    <td  colSpan="2"><p>Дата рождения:</p><span
                        className="birthdate">{birthday}</span></td>
                    <td ><p className="fate-Num">{fateNumber}</p><span className="num-descr">число судьбы</span>
                    </td>
                    <td ><p className="diagonal-Num">{temperamentNumber}</p><span
                        className="num-descr">темперамент</span>
                    </td>
                </tr>
                <tr>
                    <td ><p className="primary-Num">{primaryNumbers ? primaryNumbers[0][0]: "-"}</p>
                        <span
                            className="num-descr">характер</span></td>
                    <td ><p className="primary-Num">{primaryNumbers ? primaryNumbers[1][0]: "-"}</p>
                        <span
                            className="num-descr">здоровье</span></td>
                    <td ><p className="primary-Num">{primaryNumbers ? primaryNumbers[2][0]: "-"}</p>
                        <span
                            className="num-descr">удача</span></td>
                    <td ><p className="primary-Num">{goalNum}</p><span
                        className="num-descr">цель</span>
                    </td>
                </tr>
                <tr>
                    <td ><p className="primary-Num">{primaryNumbers ? primaryNumbers[0][1]: "-"}</p>
                        <span
                            className="num-descr">энергия</span></td>
                    <td ><p className="primary-Num">{primaryNumbers ? primaryNumbers[1][1]: "-"}</p>
                        <span
                            className="num-descr">логика</span></td>
                    <td ><p className="primary-Num">{primaryNumbers ? primaryNumbers[2][1]: "-"}</p>
                        <span
                            className="num-descr">долг</span></td>
                    <td ><p className="primary-Num">{famNum}</p><span
                        className="num-descr">семья</span>
                    </td>
                </tr>
                <tr>
                    <td ><p className="primary-Num">{primaryNumbers ? primaryNumbers[0][2]: "-"}</p>
                        <span
                            className="num-descr">интерес</span></td>
                    <td ><p className="primary-Num">{primaryNumbers ? primaryNumbers[1][2]: "-"}</p>
                        <span
                            className="num-descr">труд</span></td>
                    <td ><p className="primary-Num">{primaryNumbers ? primaryNumbers[2][2]: "-"}</p>
                        <span
                            className="num-descr">память</span></td>
                    <td ><p className="primary-Num">{habbitNum}</p><span
                        className="num-descr">привычки</span>
                    </td>
                </tr>
                <tr>
                    <td ></td>
                    <td ><p className="primary-Num">{bytNum}</p><span
                        className="num-descr">быт</span>
                    </td>
                    <td ></td>
                    <td ></td>
                </tr>
                </tbody>
            </Table>


        );
    }
}

function CopyExample(props) {

    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the the whole text area selected.
        e.target.focus();
        setCopySuccess('Copied!');
    };

    return (
        <div>
            {
                /* Logical shortcut for only displaying the
                   button if the copy command exists */
                document.queryCommandSupported('copy') &&
                <div><OverlayTrigger   placement="right"
                                       delay={{ show: 250, hide: 400 }}
                                       overlay={renderTooltip}
                                       target={copySuccess}
                >
                <Button variant="dark" onClick={copyToClipboard}>Copy</Button>
                 </OverlayTrigger></div>

            }
            <form>
        <textarea
            ref={textAreaRef}
            value={props.value}
        />
            </form>
        </div>
    );
}
function getTextFromMatrix(matrix) {
    return ""+matrix[0][0]+"/"+matrix[0][1]+"/"+matrix[0][2]+"/"+matrix[1][0]+"/"+matrix[1][1]+"/"+matrix[1][2]+"/"+matrix[2][0]+"/"+matrix[2][1]+"/"+matrix[2][2];
}

function App(props) {

    const [mask, setMask] = React.useState('00.00.0000');
    const [maskString, setMaskString] = React.useState('DD.MM.YYYY');
    const [locale, setLocale] = useState("ru");
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("DD.MM.YYYY").toString());
    const [primaryNumbers, setPrimaryNumbers] = useState(null);
    const [fateNumber, setFateNumber] = useState("-");
    const [birthday, setBirthday] = useState("-");
    const [temperamentNumber, setTemperamentNumber] = useState("-");
    const [goalNumber, setGoalNumber] = useState("-");
    const [famNumber, setFamNumber] = useState("-");
    const [habbNumber, setHabbNum] = useState("-");
    const [bytNumber, setBytNum] = useState("-");
    const [copyText, setCopyText] = useState("");

    let onChange = e => {
            setMaskString('DD.MM.YYYY');
            setMask('00.00.0000');
        if (moment(e.target.value)) {
            console.log(e.target.value);

            let dateClean = e.target.value.replace(/\./g, "").replace(/0/g, "");
            console.log(dateClean)
            let primaryNumbers = [];
            let firstNumber = 0;

            for (let i = 0; i < dateClean.length; i++) {
                primaryNumbers[i] = parseInt(dateClean.charAt(i));
                console.log(primaryNumbers[i])
                firstNumber = firstNumber + primaryNumbers[i];
            }
            console.log("firstNumber " + firstNumber);
            let secondNumberText = firstNumber.toString();
            let fateNumber = 0;
            for (let i = 0; i < secondNumberText.length; i++) {
                let newNum = parseInt(secondNumberText.charAt(i));
                primaryNumbers.push(newNum);
                console.log(primaryNumbers)
                fateNumber = fateNumber + newNum;
            }
            console.log("SecondNumber " + fateNumber);
            primaryNumbers.push(fateNumber)


            let thirdNumber = firstNumber - (2 * primaryNumbers[0]);
            console.log("thirdNumber " + thirdNumber);
            let forthNumberText = thirdNumber.toString();
            let forthNumber = 0;
            for (let i = 0; i < forthNumberText.length; i++) {
                let newNum = parseInt(forthNumberText.charAt(i));
                primaryNumbers.push(newNum);
                console.log(primaryNumbers)
                forthNumber = forthNumber + newNum;
            }
            console.log("forthNumber " + forthNumber);
            primaryNumbers.push(forthNumber)
            console.log("all numbers splitted: " + primaryNumbers)


            var matrix = [];
            let ok = 0;
            for (var i = 0; i < 3; i++) {
                matrix[i] = [];
                for (var j = 0; j < 3; j++) {
                    let okk = '';
                    ++ok;
                    for (var k = 0; k < primaryNumbers.length; k++) {
                        if (primaryNumbers[k] === ok) {
                            okk = okk + primaryNumbers[k];
                        }
                    }
                    matrix[i][j] = okk.length <= 0 ? '-' : okk;
                }
            }
            console.log("Matrix " + matrix)
            let temp1 = compareWithZero(matrix, 2, 0);
            let temp2 = compareWithZero(matrix, 1, 1);
            let temp3 = compareWithZero(matrix, 0, 2);
            let temperamentNumber = extractSumDigits(temp1, temp2, temp3);

            var goal1 = compareWithZero(matrix, 0, 0);
            var goal2 = compareWithZero(matrix, 1, 0);
            var goal3 = compareWithZero(matrix, 2, 0);
            let goalNumber = extractSumDigits(goal1, goal2, goal3);


            var fam1 = compareWithZero(matrix, 0, 1);
            var fam2 = compareWithZero(matrix, 1, 1);
            var fam3 = compareWithZero(matrix, 2, 1);
            let famNumber = extractSumDigits(fam1, fam2, fam3);

            var hab1 = compareWithZero(matrix, 0, 2);
            var hab2 = compareWithZero(matrix, 1, 2);
            var hab3 = compareWithZero(matrix, 2, 2);
            let habbNumber = extractSumDigits(hab1, hab2, hab3);

            var byt1 = compareWithZero(matrix, 1, 0);
            var byt2 = compareWithZero(matrix, 1, 1);
            var byt3 = compareWithZero(matrix, 1, 2);
            let bytNumber = extractSumDigits(byt1, byt2, byt3);

            setSelectedDate(e.target.value);
            setPrimaryNumbers(matrix);
            setFateNumber(fateNumber);
            setBirthday(e.target.value);
            setTemperamentNumber(temperamentNumber);
            setGoalNumber(goalNumber);
            setFamNumber(famNumber);
            setHabbNum(habbNumber);
            setBytNum(bytNumber);
            console.log(matrix)
            setCopyText(getTextFromMatrix(matrix)+"/"+fateNumber+"число судьбы/"
                +temperamentNumber+"темп/"+goalNumber+"цель/"+famNumber+"семья/"
                +habbNumber+"привычки/"+bytNumber+"быт")

        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                {/*<DateInput date={moment(this.context.selectedDate).format("YYYY-MM-DD")}>*/}
                {/*</DateInput>*/}
                <MaskInput
                    onChange={(e) => onChange(e)}
                    maskString={maskString}
                    mask={mask}
                    size={35}
                    showMask
                    placeholder="Введите день рождение 31.12.1920">
                </MaskInput>
                <br/>

                <CustomTable date={selectedDate} primaryNumbers={primaryNumbers}
                       fateNumber={fateNumber} birthday={birthday}
                       temperamentNumber={temperamentNumber} goalNumber={goalNumber}
                       famNumber={famNumber} habbNum={habbNumber} bytNum={bytNumber}/>

                       <CopyExample variant="dark" value={copyText}/>
            </header>
        </div>
    );
}

//"07.03.1988"
// <!-- {moment(selectedDate).format('DD.MM.YYYY').toString()} -->

export default App;
