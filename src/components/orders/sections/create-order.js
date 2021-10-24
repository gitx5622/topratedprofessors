import React from 'react';
import { Grid, Row, Col, Divider, Uploader, Steps, ButtonGroup, Input, InputGroup, Panel } from 'rsuite';
import { Box } from 'theme-ui';
import {
    Label,
    Textarea,
    Select,
    Button,
} from 'theme-ui'

const CreateOrder = () => {
    const [step, setStep] = React.useState(0);
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    return (
        <Box sx={{ marginLeft: "10px", marginRight: "10px" }}>
            {/* {closeAlertErrorMessage ?
            <Alert sx={{background: "red"}}>
                {errorMessage}
                <Close ml="auto" mr={-2} onClick={handleCloseErrorMessageAlert}/>
            </Alert>
                : ''
        }
        {checkDetailsData.errorMessage && (
            closeAlert ?
                <Alert sx={{background: "red"}}>{checkDetailsData.errorMessage}<Close ml="auto" mr={-2} onClick={handleCloseAlert}/></Alert>
                : ''
        )}
        <form onSubmit={handleCreateOrderSubmit}>
            <Grid sx={styles.form.grid}>
                <Box>
                    <Label htmlFor="service">Service</Label>
                    <Select sx={styles.form.select} onChange={parseServiceSelected} name="service_id">
                        {serviceSelector.services.map(service => { return (
                            <option key={service.id} value={JSON.stringify(service)}>{service.name}</option>
                        )})}
                    </Select>
                </Box>
                <Box>
                    <Label htmlFor="type_id">Type of Paper</Label>
                    <Select sx={styles.form.select} onChange={parseTypeSelected} name="type_id">
                        {typeSelector.types.map(type => { return (
                            <option key={type.id} value={JSON.stringify(type)}>{type.name}</option>
                        )})}
                    </Select>
                </Box>
                <Box>
                    <Label htmlFor="urgency_id">Urgency</Label>
                    <Select sx={styles.form.select} onChange={parseUrgencySelected} name="urgency_id">
                        {urgencySelector.urgencies.map(urgency => { return (
                            <option key={urgency.id} value={JSON.stringify(urgency)}>{urgency.name}</option>
                        )})}
                    </Select>
                </Box>
                <Box>
                    <Label htmlFor="style_id">Style</Label>
                    <Select sx={styles.form.select} onChange={handleChange} name="style_id" >
                        {styleSelector.styles.map(style => { return (
                            <option key={style.id} value={style.id}>{style.name}</option>
                        )})}
                    </Select>
                </Box>
                <Box>
                    <Label htmlFor="sources">Sources</Label>
                    <Select sx={styles.form.select} onChange={handleChange} name="sources_id">
                        {sourcesSelector.sources.map(sources => { return (
                            <option key={sources.id} value={sources.id}>{sources.name}</option>
                        )})}
                    </Select>
                </Box>
                <Box>
                    <Label htmlFor="language_id">Language</Label>
                    <Select sx={styles.form.select} onChange={handleChange} name="language_id">
                        {languageSelector.languages.map(language => { return (
                            <option key={language.id} value={language.id}>{language.name}</option>
                        )})}
                    </Select>
                </Box>
                <Box>
                    <Label htmlFor="page_id">Pages</Label>
                    <Select sx={styles.form.select} onChange={parsePageSelected} name="page_id" id="page_id">
                        {pageSelector.pages.map(page => { return (
                            <option key={page.id} value={JSON.stringify(page)}>{page.name}</option>
                        )})}
                    </Select>
                </Box>
                <Box>
                    <Label htmlFor="level_id">Level</Label>
                    <Select sx={styles.form.select} onChange={parseLevelSelected} name="level_id">
                        {levelSelector.levels.map(level => { return (
                            <option key={level.id} value={JSON.stringify(level)}>{level.name}</option>
                        )})}
                    </Select>
                </Box>
                <Box>
                    <Label htmlFor="service_id">Spacing</Label>
                    <Select sx={styles.form.select} onChange={parseSpacingSelected} name="spacing_id">
                        {spacingSelector.spacings.map(spacing => { return (
                            <option sx={styles.form.select.option} key={spacing.id} value={JSON.stringify(spacing)}>{spacing.name}</option>
                        )})}
                    </Select>
                </Box>
                <Box>
                    <Label htmlFor="subject_id">Subject</Label>
                    <Select sx={styles.form.select} name="subject_id">
                        {subjectSelector.subjects.map(subject => { return (
                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                        )})}
                    </Select>
                </Box>
                <Box>
                    <Label htmlFor="spacing">Phone</Label>
                    <Input sx={styles.form.select} onChange={handleChange} placeholder="0712345678" name="phone" type="text"/>
                </Box>
            </Grid>
            <Grid sx={styles.form.topicGrid}>
                <Box>
                    <Label htmlFor="topic ">Topic</Label>
                    <Input sx={styles.form.select} onChange={handleChange} name="topic " placeholder='Topic' />
                </Box>
                <Box>
                    <Label htmlFor="username">Upload Files</Label>
                    <StyledDropzone/>
                </Box>
            </Grid>
            <Box mt={3} >
                <Label htmlFor="spacing">Instructions</Label>
                <Textarea sx={styles.form.textarea} autoFocus onChange={handleChange} name="comment" id="comment" rows={6}/>
            </Box>
            <button style={styles.buttonCreate}  type='submit'>Create Order</button>
        </form> */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Create Order:</h3>
                <h3>Price: <span style={{ color: "orange" }}>$0.00</span></h3>
            </Box>

            <Divider />
            <Box as="form">
                <Grid fluid>
                    <Row>
                        <Col xs={6}>
                            <Panel shaded style={{ minHeight: "400px", background: "whitesmoke" }}>
                                <Steps current={step} vertical style={styles}>
                                    <Steps.Item title="Order requirements" description="Fill in your order requirements." />
                                    <Steps.Item title="Complete Order details" description="Make sure all the order requirements are filled" />
                                </Steps>
                            </Panel>
                        </Col>
                        <Col xs={18}>
                            {step === 0 && (
                                <Box>
                                    <h5>Enter Order details:</h5><br />
                                    <Col xs={8}>
                                        <Label htmlFor="sound">Service</Label>
                                        <Select name="sound" id="sound" mb={3}>
                                            <option>Beep</option>
                                            <option>Boop</option>
                                            <option>Blip</option>
                                        </Select>
                                        <Label htmlFor="sound">Type of Paper</Label>
                                        <Select name="sound" id="sound" mb={3}>
                                            <option>Beep</option>
                                            <option>Boop</option>
                                            <option>Blip</option>
                                        </Select>
                                        <Label htmlFor="sound">Level</Label>
                                        <Select name="sound" id="sound" mb={3}>
                                            <option>Beep</option>
                                            <option>Boop</option>
                                            <option>Blip</option>
                                        </Select>
                                        <Label htmlFor="sound">Subject</Label>
                                        <Select name="sound" id="sound" mb={3}>
                                            <option>Beep</option>
                                            <option>Boop</option>
                                            <option>Blip</option>
                                        </Select>
                                    </Col>
                                    <Col xs={8}>
                                        <Label htmlFor="sound">Urgency</Label>
                                        <Select name="sound" id="sound" mb={3}>
                                            <option>Beep</option>
                                            <option>Boop</option>
                                            <option>Blip</option>
                                        </Select>
                                        <Label htmlFor="sound">Style</Label>
                                        <Select name="sound" id="sound" mb={3}>
                                            <option>Beep</option>
                                            <option>Boop</option>
                                            <option>Blip</option>
                                        </Select>
                                        <Label htmlFor="sound">Sources</Label>
                                        <Select name="sound" id="sound" mb={3}>
                                            <option>Beep</option>
                                            <option>Boop</option>
                                            <option>Blip</option>
                                        </Select>
                                        <h5>Have a prome Code ?</h5>
                                        <InputGroup>
                                            <Input />
                                            <InputGroup.Addon style={{ background: "blue", color: "white" }}>Apply</InputGroup.Addon>
                                        </InputGroup>
                                    </Col>
                                    <Col xs={8}>
                                        <Label htmlFor="sound">Spacing</Label>
                                        <Select name="sound" id="sound" mb={3}>
                                            <option>Beep</option>
                                            <option>Boop</option>
                                            <option>Blip</option>
                                        </Select>
                                        <Label htmlFor="sound">Language</Label>
                                        <Select name="sound" id="sound" mb={3}>
                                            <option>Beep</option>
                                            <option>Boop</option>
                                            <option>Blip</option>
                                        </Select>
                                        <Label htmlFor="sound">Pages</Label>
                                        <Select name="sound" id="sound" mb={3}>
                                            <option>Beep</option>
                                            <option>Boop</option>
                                            <option>Blip</option>
                                        </Select>
                                    </Col>
                                </Box>
                            )}
                            {step === 1 && (
                                <Box>
                                    <Label htmlFor="username">Topic*</Label>
                                    <Input name="username" id="username" mb={3} />
                                    <Label htmlFor="username">Instructions*</Label>
                                    <Textarea name="comment" id="comment" rows={4} mb={3} />
                                    <Label htmlFor="username">Upload files (optional)</Label>
                                    <Uploader action="//jsonplaceholder.typicode.com/posts/" draggable>
                                        <div style={{ lineHeight: '100px', background: "whitesmoke" }}>Click or Drag files to this area to upload</div>
                                    </Uploader>
                                </Box>
                            )}
                            <Row>
                                <Col xs={24}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <ButtonGroup>
                                            <Button sx={{ background: "blue" }} onClick={onPrevious} disabled={step === 0}>
                                                Previous
                                            </Button>{" "}
                                            <Button sx={{ background: "orange" }} onClick={onNext} disabled={step === 1}>
                                                Next
                                            </Button>
                                        </ButtonGroup>
                                        {step === 1 && (
                                            <Button type='submit' sx={{ background: "green" }} >
                                                Create Order
                                            </Button>
                                        )}
                                    </Box>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </Box>
        </Box>
    )
}

export default CreateOrder;

const styles = {
    width: '200px',
    display: 'inline-table',
    verticalAlign: 'top'
};
