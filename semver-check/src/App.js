import './App.css';
import { useState } from 'react';
import satisfies from 'semver/functions/satisfies';
import constraintValid from 'semver/functions/valid';
import rangeValid from 'semver/ranges/valid';

function IsSatisfying({constraint,version}){

    if (satisfies(version, constraint)){
        return <div className="mt-3 alert alert-success" role="alert">
            <b>{version} </b> satisfies the <b>{constraint}</b> constraint
        </div>
    }

    return <div className="mt-3 alert alert-danger" role="alert">
            <b>{version} </b> does not satisfies the <b>{constraint}</b> constraint
        </div>
}


function App() {

    const [constraint, setConstraint] = useState('');
    const [version, setVersion] = useState('');

    const isConstraintValid = constraint && rangeValid(constraint);
    const isConstraintInvalid = constraint && !rangeValid(constraint);
    const isVersionValid = version && constraintValid(version);
    const isVersionInvalid = version && !constraintValid(version)
    return <>
        <h1>Semver check</h1>
        <div className='pt-3'>
            Online semantic version checker. <br></br>
            This check uses <a href='https://www.npmjs.com/package/semver'> the semver package</a> to check a provided version against a constraint.
        </div>
        <div className='row pt-3'>
            <div className='col-12 col-sm-6'>
                <b>Constraint</b><br></br>
                <input 
                    type='text'
                    value={constraint} 
                    placeholder="^1.0.0"
                    onChange={e => setConstraint(e.target.value)} 
                    className={`form-control ${isConstraintInvalid && 'is-invalid'} ${isConstraintValid && 'is-valid'}`}
                ></input>

                {isConstraintInvalid && <div className="mt-3 alert alert-danger" role="alert">
                    <b>{constraint} </b> is not a valid constraint
                </div>}
            </div>
            <div className='col-12 col-sm-6'>
                <b>Check</b><br></br>
                <input 
                    type='text'
                    value={version} 
                    placeholder="1.0.0"
                    onChange={e => setVersion(e.target.value)}
                    className={`form-control ${isVersionInvalid && 'is-invalid'} ${isVersionValid && 'is-valid'} `}>
                </input>

                {isVersionInvalid && <div className="mt-3 alert alert-danger" role="alert">
                    <b>{version} </b> is not a valid version
                </div>}

                {isVersionValid && isConstraintValid && <IsSatisfying version={version} constraint={constraint}></IsSatisfying>}
            </div>
        </div>
        
        <h4 style={{paddingTop:100}}>Useful links</h4>
        <ul>
            <li><a href='https://semver.org/'>Semver docs</a></li>
            <li><a href='https://www.npmjs.com/package/semver'>Semver package</a></li>
        </ul>
    </>

}

export default App;
