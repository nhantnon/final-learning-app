require 'google/apis/plus_v1'

plus = Google::Apis::PlusV1::PlusService.new
plus.key = ENV['API_KEY']
