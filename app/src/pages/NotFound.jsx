import { Link }         from "react-router-dom";
import BuildingsSticky  from "../components/bg/BuildingsSticky";
import PageGradient     from "../components/bg/PageGradient";
import CenterFrostDiv   from '../components/CenterFrostDiv';

export default function()
{
    return (
        <>
            <BuildingsSticky />
            <PageGradient>
                <CenterFrostDiv>
                    <h1>Page not found</h1>
                    <hr />
                    <p>Sorry, this page was not found.</p>
                    <Link to="/">Home</Link>
                </CenterFrostDiv>
            </PageGradient>
        </>
    )
}