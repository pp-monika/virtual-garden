rm(list = ls())
setwd("D:/BU/civilhack/dwc_huh_data/dwca-huh_usa")

library(readxl)
library(tidyverse)
library(dplyr)

media <- read.delim("multimedia.txt")
occurrence <- read.delim("occurrence.txt")
identification <- read.delim("identification.txt")

## select useful columns

## merge with id

full_dataset <- inner_join(media, occurrence, by = 'id')
full_dataset <- inner_join(full_dataset, identification, by = 'id')

colnames(full_dataset)

full_dataset_selected <- subset(full_dataset, select = c("id", "identifier", "stateProvince", "scientificName.x", "scientificName.y"))

write.csv(full_dataset_selected, "full_dataset_selected.csv", row.names = FALSE)
write.csv(full_dataset, "full_dataset.csv",row.names = FALSE)

identi_occ <- inner_join(identification, occurrence, by = 'id')


length(unique(identi_occ$scientificName.x))

mass_data <- identi_occ %>%
  filter(stateProvince == "Massachusetts")
mass_uni <- unique(mass_data$id)

data_match_mass <- full_dataset %>%
  filter(id %in% mass_uni & stateProvince == "Massachusetts")

texas_data <- identi_occ %>%
  filter(stateProvince == "Texas")
length(unique(texas_data$scientificName.x))


missouri_data <- identi_occ %>%
  filter(stateProvince == "Missouri")
length(unique(missouri_data$scientificName.x))

sampled_dataset <- full_dataset %>%
  group_by(stateProvince) %>%
  slice_sample(n = 50, replace = FALSE) 

# Ungroup to remove grouping structure
sampled_dataset <- ungroup(sampled_dataset)

sampled_dataset <- sampled_dataset %>%
  filter(stateProvince != "")
write.csv(sampled_dataset, "sampled_dataset.csv",row.names = FALSE)
