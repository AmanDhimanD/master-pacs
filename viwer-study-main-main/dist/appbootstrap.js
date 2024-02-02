function ViewerImageData() { this.imageId = "" } function ViewerSeriesData() { this.seriesUid = "", this.SOPClassUID = "", this.seriesDescription = "", this.seriesNumber = "", this.instanceList = [] } function ViewerStudyData() { this.patientName = "", this.patientId = "", this.studyDate = "", this.modality = "", this.studyDescription = "", this.numImages = "", this.studyId = "", this.seriesList = [] } function getStudyId() { return new URLSearchParams(window.location.search).get("studyId") } function getParsedData(e) { var t = new ViewerStudyData; t.patientId = e.patientId, t.patientName = e.patientName, t.studyDate = e.studyDate, t.modality = e.modality, t.studyDescription = e.studyDescription, t.numImages = e.numImages, t.studyId = e.studyId, t.seriesList = []; for (var s = 0; s < e.seriesList.length; s++) { var i = new ViewerSeriesData; i.seriesUid = e.seriesList[s].seriesUid, i.SOPClassUID = e.seriesList[s].SOPClassUID, i.seriesDescription = e.seriesList[s].seriesDescription, i.seriesNumber = e.seriesList[s].seriesNumber, i.instanceList = []; for (var a = 0; a < e.seriesList[s].instanceList.length; a++) { var n = new ViewerImageData; n.imageId = e.seriesList[s].instanceList[a].imageId, i.instanceList.push(n) } t.seriesList.push(i) } return t } function getStudyData(e) { var t = studyUrlEndPoint.replace("{0}", e); return new Promise((e, s) => { fetch(t).then(res => res.json()).then(d => { var s = getParsedData(d); e(s) })/*$.getJSON(t,function(t){var s=getParsedData(t);e(s)})*/ }) } window.studyUrlEndPoint = apiEndPoint/*"http://localhost:8000//api/v2/medical-data/650ecb30afb8887a5212decc","http://localhost:8000/api/getstudydata?studyId={0}"*/, window.imageUrlProxy = "", window.debugMode && (window.studyUrlEndPoint = "studies/{0}.json", window.imageUrlProxy = "localhost:8080/images/"), window.addEventListener("load", function () { var e = getStudyId(); getStudyData(e).then(t => { var s = $(".viewports-layout"); loadTemplate("internal/viewport.html", function (i) { loadStudy(s, i, e, t) }) }) });