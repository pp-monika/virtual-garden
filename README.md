This project is a part of CivicHacks 2025, a 2-day Hackathon that aims at finding solutions for equitable future, in the Biodiversity Track.

## Website
https://usvirtualgarden.netlify.app/

## Team Members
1. Anna Huang
2. Hongzun Zhang
3. Monika Phuengmak

## Goal
We aim to create a website that function similar to an online exhibit to lower the barrier to exploring natural history collections for the general public who are interested in learning about plants and bidiversity. Particularly, we structure the presentation in a curated collection format to help visitors who are unsure of what they are looking to achieve get start exploring and introduce a gamification element such as collecting hidden badges to encourage self-exploration.

## Data Description and Processing
The datasets are provided to us by Harvard University Herbaria. We use a small sample of specimens founded and recorded in the U.S. for website DEMO due to the time constraint. Errors happened during the transformation from .txt file to readable .csv file, the `state` column contains location names that are invalid, i.e. locations that don't exist.

## installation
```
cd virtual-museum
npm install vite --save-dev
npm run dev
```
