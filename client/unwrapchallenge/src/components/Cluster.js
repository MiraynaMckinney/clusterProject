import Entry from './Entry'
import '../index.css'

const Clusters = ({ cluster, addToCluster }) => {
    return (
        <div className='item'>
            <div className='clusterheader'>
                <h3 onClick={addToCluster} className='title'>{cluster.title}</h3>
                {cluster.accepted === 1 ? <h4>A</h4> : <h4>U</h4>}
            </div>
            <div>
                <Entry sentences={cluster.sentences} />
            </div>
        </div>
    )
}

export default Clusters