const Entry = ({ sentences, selected }) => {
    return (<>
        <div>
            <span>
                {sentences.map((sentence) => {
                    
                    return sentence === selected ? <h3 key={sentence.id} id='incluster'>{sentence}</h3> : <h3 key={sentence.id} >{sentence}</h3> 
})}
            </span>
        </div>
    </>
    )
}

export default Entry