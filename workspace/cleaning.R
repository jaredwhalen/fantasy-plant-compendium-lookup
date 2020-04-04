setwd("~/Documents/GitHub/fantasy-plant-compendium-lookup")
library(tidyverse)

text <- read_lines("~/Documents/GitHub/fantasy-plant-compendium-lookup/data/text.txt")
text2 <- tibble(text)
names <- read_lines("~/Documents/GitHub/fantasy-plant-compendium-lookup/data/names.txt")

text3 <- text2 %>% 
  mutate(
    header = case_when(
      nchar(text) == 1 ~ TRUE,
      TRUE ~ FALSE
    )
  ) %>% 
  filter(!header) %>% 
  mutate(
    name = case_when(
      text %in% names ~ TRUE,
      TRUE ~ FALSE
    )
  )

section_breaks <- which(text3$name)
biomes <- section_breaks + 1

manual_fix <- list()
big_list <- list()

i <- 0
for (index in section_breaks) {
  i <- i + 1

  # print(text3[index,]$text)
  name <- text3[index,]$text
  biome <- text3[index + 1,]$text
  detail <- text3[index + 2,]$text

  # print(paste(name, section_breaks[i+1] - section_breaks[i]))
  subrows <- (as.integer(section_breaks[i+1]) - as.integer(section_breaks[i]) - 3)
  subrow <- ""
  # print(paste(as.integer(section_breaks[i+1]), as.integer(section_breaks[i])))
  
  if (!is.na(subrows) & subrows > 0) {
    # print(subrows)
    # line_list <- list()
    # for (row in 1:subrows) {
    # 
    #   line <- text3[index + 1 + row,]$text
    #   line_list[[length(line_list) + 1]] <- line
    # }
    manual_fix[[length(manual_fix) + 1]] <- name
  } else {
    item <- data.frame(
      name = name,
      biome = biome,
      detail = detail
    )
    
    big_list[[length(big_list) + 1]] <- item    
  }
}

df <- bind_rows(big_list)
