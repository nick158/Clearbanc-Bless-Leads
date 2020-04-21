import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import SubmitForm from "../components/SubmitForm"
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Tired of Googling prospect information?</h1>
    <p>Save time by sending a sheet with your leads for enrichment.</p>
    <a href="https://www.google.ca" target="_blank">Make Sure You Use This Template</a>
    <p>Fill in this form with your work email, link to your gSheets with leads, and the right password</p>
    <SubmitForm />
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>

    </div>
  </Layout>
)

export default IndexPage
