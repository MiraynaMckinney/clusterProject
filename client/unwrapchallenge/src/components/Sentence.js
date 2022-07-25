const Sentence = ({ sentence, select, selectToCluster }) => {
    return (
        <div>
        {select && selectToCluster.includes(sentence) ? <span  className="item selected">{sentence}</span> : <span onClick={() => {console.log('CLICKED')}} className="item">{sentence}</span>}
        </div>
    )
}

export default Sentence;