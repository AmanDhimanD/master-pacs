import React from "react";

const Alerts = () => {
    return (
        <>
            <div className="main-container">
                <div className="xs-pd-20-10 pd-ltr-20">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="title">
                                    <h4>Alters </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form>
                        <div className="page-header">
                            <div className="row">
                                <div className="col-md-10 col-sm-10">
                                    <div class="row mb-4">
                                        <div class="col-md-3 col-sm-3">
                                            <input
                                                type="radio"
                                                id="radioInput"
                                                name="eventType"
                                                value="eventTypeValue"
                                                style={{ transform: "scale(1.5)" }}
                                            />
                                            <label for="radioInput" class="custom-label ml-2">
                                                SMS
                                            </label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-2 col-sm-2">
                                            <input
                                                type="radio"
                                                id="radioInput"
                                                name="eventType"
                                                value="eventTypeValue"
                                            />
                                            <label for="radioInput" class="custom-label ml-2">
                                                Client Center
                                            </label>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Message Format"
                                            />
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Number"
                                            />
                                        </div>
                                    </div>

                                    <div class="row mt-5">
                                        <div class="col-md-2 col-sm-2">
                                            <input
                                                type="radio"
                                                id="radioInput"
                                                name="eventType"
                                                value="eventTypeValue"
                                            />
                                            <label for="radioInput" class="custom-label ml-2">
                                                Ref. Physician
                                            </label>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Message Format"
                                            />
                                        </div>
                                    </div>

                                    <div class="row mt-5">
                                        <div class="col-md-2 col-sm-2">
                                            <input
                                                type="radio"
                                                id="radioInput"
                                                name="eventType"
                                                value="eventTypeValue"
                                            />
                                            <label for="radioInput" class="custom-label ml-2">
                                                Others
                                            </label>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Message Format"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="page-header">
                            <div className="row">
                                <div className="col-md-10 col-sm-10">
                                    <div class="row mb-4">
                                        <div class="col-md-3 col-sm-3">
                                            <input
                                                type="radio"
                                                id="radioInput"
                                                name="eventType"
                                                value="eventTypeValue"
                                                style={{ transform: "scale(1.5)" }}
                                            />
                                            <label for="radioInput" class="custom-label ml-2">
                                                Email
                                            </label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-2 col-sm-2">
                                            <input
                                                type="radio"
                                                id="radioInput"
                                                name="eventType"
                                                value="eventTypeValue"
                                            />
                                            <label for="radioInput" class="custom-label ml-2">
                                                Client Center
                                            </label>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="E-Mail Format"
                                            />
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="E-Mail ID"
                                            />
                                        </div>
                                    </div>

                                    <div class="row mt-5">
                                        <div class="col-md-2 col-sm-2">
                                            <input
                                                type="radio"
                                                id="radioInput"
                                                name="eventType"
                                                value="eventTypeValue"
                                            />
                                            <label for="radioInput" class="custom-label ml-2">
                                                Ref. Physician
                                            </label>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="E-Mail Format"
                                            />
                                        </div>
                                    </div>

                                    <div class="row mt-5">
                                        <div class="col-md-2 col-sm-2">
                                            <input
                                                type="radio"
                                                id="radioInput"
                                                name="eventType"
                                                value="eventTypeValue"
                                            />
                                            <label for="radioInput" class="custom-label ml-2">
                                                Others
                                            </label>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="E-Mail Format"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="page-header">
                            <div className="row">
                                <div className="col-md-10 col-sm-10">
                                    <div className="row mb-4">
                                        <div className="col-md-3 col-sm-3">
                                            <div className="border p-3 d-flex align-items-center">
                                                <input
                                                    type="radio"
                                                    id="radioInput"
                                                    name="eventType"
                                                    value="eventTypeValue"
                                                    style={{ transform: "scale(1.5)" }}
                                                />
                                                <label
                                                    htmlFor="radioInput"
                                                    className="custom-label ml-2"
                                                >
                                                    New image added alert
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-md-3 col-sm-3">
                                            <div className="border p-3 d-flex align-items-center">
                                                <input
                                                    type="radio"
                                                    id="radioInput"
                                                    name="eventType"
                                                    value="eventTypeValue"
                                                    style={{ transform: "scale(1.5)" }}
                                                />
                                                <label
                                                    htmlFor="radioInput"
                                                    className="custom-label ml-2"
                                                >
                                                    Emergency study alert
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-md-3 col-sm-3">
                                            <div className="border p-3 d-flex align-items-center">
                                                <input
                                                    type="radio"
                                                    id="radioInput"
                                                    name="eventType"
                                                    value="eventTypeValue"
                                                    style={{ transform: "scale(1.5)" }}
                                                />
                                                <label
                                                    htmlFor="radioInput"
                                                    className="custom-label ml-2"
                                                >
                                                    Report done alert
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary" type="submit">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Alerts;