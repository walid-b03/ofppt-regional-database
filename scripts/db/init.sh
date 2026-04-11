#!/bin/bash

################## IMPORTANT! ##################
#                                              #
# This Script Must Be Executed On PROJECT_ROOT #
#                                              #
################################################


source .env
export DB_HOST DB_DATABASE DB_USERNAME DB_PASSWORD
envsubst < scripts/db/init.sql | sudo mariadb -u root

