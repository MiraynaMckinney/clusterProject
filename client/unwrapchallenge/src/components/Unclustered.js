import Sentence from './Sentence'
import SearchBar from './SearchBar'
import '../index.css'

const Unclustered = ({ unclusteredList, select, toggleSelect, selectToCluster, createmapping }) => {
    const category = { placeholder: 'Type a sentence', type: 'Unclustered' }
    return (<section>
        <div className='header'>
            <h2>Unclustered</h2>
        </div>
        <div>
            <SearchBar className='searchbar' category={category} />
            <button onClick={() => createmapping(1, 2)}>{
                select ? 'cancel' : 'select'
            }</button>
        </div>
        <div id='unclusteredlist'>
            {unclusteredList.map((sentence) => {
                <Sentence key={sentence.id} className='sentence' sentence={sentence} select={select} selectToCluster={selectToCluster} />
            })}
        </div>
        {select ? <span>click a cluster name to add selected sentences to it</span> : <></>}
    </section>
    )
}

export default Unclustered