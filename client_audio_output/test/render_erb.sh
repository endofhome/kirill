#!/usr/bin/env bash

# Example usage:
# Split the variables with a colon, like so.
# First argument is the template, second argument is the variables, semi-colon separated.
# ./render_erb.sh "<%= x %>, oh yeah <%= y%>" "x = \"great\";y = \"woohoo!\""

template=$1
variables=$2

tmp_file=$(mktemp)

# Add variables to the local scope (binding)
cat <<EOF >> "$tmp_file"
require 'erb'

$variables
EOF

cat <<EOF >> "$tmp_file"
erb_template = ERB.new "$template"
puts erb_template.result(binding)
EOF

echo "$(ruby "$tmp_file")"