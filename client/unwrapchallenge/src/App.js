
import { useEffect, useState } from 'react';
import Clusters from './components/Clusters';
import Unclustered from './components/Unclustered'
import './index.css'
import Axios from 'axios'

function App() {
  const [select, toggleSelect] = useState(false)
  const [filter, changeFilter] = useState('All')
  const [selected, addSelected] = useState([])
  const [clusterList, setClusterList] = useState([])
  const [unclusteredList, setUnclusteredList] = useState([])
  const [clusterSearch, setClusterSearch] = useState('')
  const [unclusteredSearch, setUnclusteredSearch] = useState('')


  const getClusters = () => {
    Axios.get("http://localhost:3306/clusters",
    {
      search:clusterSearch
    }
    ).then(response => {
      setClusterList(response.data);
    }).catch(e => {
      console.log(e);
    });
  }

  const newclusterlist = (filter) => {
    changeFilter(filter);
    Axios.get("http://localhost:3306/unclustered").then(response => {
      console.log(response);
    }).catch(e => {
      console.log(e);
    })
  }

//delete sentence from cluster
  const removeSentence = (sentence, cluster) => {
    Axios.post("http://localhost:3306/deletemapping", {
      sentence_id: cluster.id,
      cluster_id: sentence.id
    }).then(response => {
      setClusterList(response.data);
    }).catch(e => {
      console.log(e);
    });
  }
  
//adds sentences to cluster
  const addToCluster = (cluster) => {
    if (!select){
      return
    }
    selected.map((sentence) => {
      createmapping(cluster = { cluster }, sentence = { sentence })
    })
  }

  const createmapping = (cluster, sentence) => {
    toggleSelect(!select);
    Axios.post("http://localhost:3306/map",
      {
        sentence_id: sentence.id,
        cluster_id: cluster.id,
      }).then(response => {
        console.log(response);
        getClusters();
      }).catch(e => {
        console.log(e);
      });
  }

  return (
    <div className="App">
      <Clusters className='section' clusterList={clusterList} addToCluster={addToCluster} filter={filter} changeFilter={newclusterlist} />
      <Unclustered className='section' unclusteredList={unclusteredList} select={select} toggleSelect={toggleSelect} selectToCluster={selected} createmapping={createmapping} />
    </div>
  );
}

export default App;
