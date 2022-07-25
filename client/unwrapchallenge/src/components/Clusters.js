import ClusterFilter from './ClusterFilter'
import SearchBar from './SearchBar'
import Cluster from './Cluster'
import '../index.css'

const Clusters = ({ clusterList, filter, changeFilter, addToCluster }) => {
    const category = { placeholder: 'Type a Cluster Name', type: 'Clusters' }
    return (<section>
        <div className='header'>
            <h2>Clusters</h2>
            <ClusterFilter filter={filter} changeFilter={changeFilter}/>
        </div>
        <SearchBar className='searchbar' category={category} />
        <div className='clusterlist'>
            {clusterList.map((cluster) => {
                <Cluster key={cluster.id} cluster={cluster} addToCluster={addToCluster}/>
})}
        </div>
    </section>
    )
}

export default Clusters