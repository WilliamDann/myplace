import BuildingsSticky from './bg/BuildingsSticky'
import PageGradient    from './bg/PageGradient'
import Table           from './ui/Table'

import useApi from '../api/useApi';

export default function({onError})
{
    let message;
    const {data, loading, error} = useApi(
        {
            endpoint: `/place/my`,
            opts:
            {
                credentials: 'include',
            }
        }
    )

    if (error) 
    {
        onError(error);
        return;
    }

    if (loading)
        message = 'loading items...'

    return (
        <>
            <BuildingsSticky />
            <PageGradient>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        width: '100vw',
                    }}>
                    <div
                    style={{
                        border: "1px solid grey",
                        borderRadius: "10px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)", // Safari support
                        width: "50%",
                    }}
                    className="p-3 text-center text-white"
                    >

                        <h1>Place Select</h1>
                        <p className='text-white'>Which place are you working with today?</p>
                        <hr />
                        {
                            data?.map(item => {
                                return (
                                    <div className="text-start container-lg border p-2 m-2" key={item.id}>
                                        <Table data={item} />
                                        <a className="btn btn-primary m-1 pt-1 pb-1" href={"/place/" + item.id}>Select</a>
                                    </div>
                                );
                            })
                        }
                        <hr />
                        <p>Or, create a new place:</p>
                        <a className="btn btn-primary mb-3" href="/place/create">New Place</a>
                    </div>
                </div>
            </PageGradient>
        </>
    )
}