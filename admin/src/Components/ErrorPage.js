import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <>
            <div
                class="error-page d-flex align-items-center flex-wrap justify-content-center pd-20"
            >
                <div class="pd-10">
                    <div class="error-page-wrap text-center">
                        <h1>400</h1>
                        <h3>Error: 400 PAGE NOT FOUND !</h3>
                        <p>You Seem To Be Trying To Find His Way Home</p>
                        <div class="pt-20 mx-auto max-width-200">
                            <Link to='/' class="btn btn-primary btn-block btn-lg"
                            >Back To Home
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ErrorPage