"use client"
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Typography, Box, Grid } from "@mui/material";
import Head from "next/head";

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
     console.error(checkoutSession.message)
     return 
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }
  return (
    <Container maxWidth="100vw">
      <Head>
        <title>Flashcards SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>Flashcard SaaS</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" gutterBottom>Welcome to Flashcard SaaS</Typography>
        <Typography variant="h5" gutterBottom>The easiest way to create flashcards with your text</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>Get Started</Button>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4">Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterbottom> Easily Input Your Text </Typography>
            <Typography gutterbottom> Flashcard SaaS easily understands your text input and takes it in to create Flashcards, studying has never been any easier </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterbottom> FlashCards with AI ? </Typography>
            <Typography gutterbottom> Yes FlashCards SaaS is able to create flashcards through your text along with any text that AI gives also and is able to automatically generate
              Flashcards also </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterbottom> User-Friendly Website </Typography>
            <Typography gutterbottom> Flashcard SaaS creates flashcards at a basic level and it is even user-friendly for people who might be new to browsing or are starting to user
              the internet </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom> Pricing </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, border: "1px solid", borderColor: "grey.300", borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom> 1 Basic Level Plan </Typography>
              <Typography variant="h6" gutterBottom> 5$ / Month </Typography>
              <Typography gutterBottom> The Basic plan costing 5 dollars per month would give user access to making their own flashcards, and limited storage. </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}> Choose Basic Plan </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, border: "1px solid", borderColor: "grey.300", borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom> 3 Pro High Level Plan </Typography>
              <Typography variant="h6" gutterBottom> 10$ / Month </Typography>
              <Typography gutterBottom> The High Level plan costs 90 dollars per month, gives user access to make their own flashcards, mostly all available storage, has 900,000 requests to AI
                to generate flashcards for the user. </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}> Choose Pro High Plan </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
