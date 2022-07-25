const ClusterFilter = ({ filter, changeFilter, }) => {
    return (
        <select className='dropdown' onChange={ (e) => {
            filter = e.target.value;
            changeFilter(filter)}
            }>
            <option value='All'>All</option>
            <option value='Accepted'>Accepted</option>
            <option value='Unaccepted'>Unaccepted</option>
        </select>
    )
}

export default ClusterFilter