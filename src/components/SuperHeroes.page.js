import axios from 'axios'
import React, {useState, useEffect} from 'react'

export function SuperHeroesPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, SetData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/superheroes`).then((res)=>{
            SetData(res.data)
            setIsLoading(false)
        })
    }, [])

    if(isLoading){
        return <h2>Loading...</h2>
    }
    
  return (
<>
<h2>
    Super Hero Page
</h2>
{data.map((hero)=>{
return <div key={hero.name}>{hero.name}</div>
})}
</>
  )
}