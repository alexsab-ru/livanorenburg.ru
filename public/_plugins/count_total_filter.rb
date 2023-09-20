module Jekyll
	module CountTotalFilter
		def count_total(collection, value)
		count = 0
		collection.each do |item|
			count += item[value]
		end
		count
		end
	end
end

Liquid::Template.register_filter(Jekyll::CountTotalFilter)