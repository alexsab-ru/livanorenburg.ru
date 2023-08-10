module Jekyll
		module PageFilters
			def children_of(all_pages, parent)
				all_pages.select { |p| child_of?(p, parent) }
			end

			private

			def child_of?(child, parent)
				parent_path = parent["path"]
				child_path = child.path

				# Exclude 'index.md' from becoming a child of itself
				return false if parent_path == child_path

				# Remove 'index.md' from the parent path
				parent_path = parent_path.split("index.html", 2).first

				child_path.start_with? parent_path
			end
		end
	end

	Liquid::Template.register_filter(Jekyll::PageFilters)