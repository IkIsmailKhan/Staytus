import React, { useEffect } from 'react';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlanets } from '../store/planets/index';

const List = () => {

    const planets = useSelector(state => state.planets)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPlanets())
    }, [dispatch])

    return (
        <div>
            {
                planets.loading ? <div>Loading</div> : <div>
                    {
                        planets.list.map((item, i) => {
                            return (
                                <div key={item.name}>
                                    <Card data={item}/>
                                </div>
                            )
                        })
                    }
                </div>
            }

        </div>
    )
}

export default List