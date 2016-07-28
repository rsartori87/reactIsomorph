export default function fetchComponentData(dispatch, components, params) {
    const needs = components.reduce((prev, current) => {
        return (current.needs || [])
            .concat((current.WrappedComponent ? current.WrappedComponent.needs : []) || [])
            .concat(prev);
    }, []);

    //const promises = needs.map(need => dispatch(need(params)));
    const promises = [dispatch(needs[0](params))];

    console.log(promises);

    return Promise.all(promises);
}