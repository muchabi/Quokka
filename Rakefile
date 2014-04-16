namespace 'ext' do
  desc 'Pack the Chrome extension'
  task :chrome do
    sh 'zip -r files/techConnect_chr.zip techConnect_chr'
  end

  desc 'Pack the Firefox extension'
  task :firefox do
    puts 'Firefox extension not implemented yet!'
  end

  desc 'Pack all extensions'
  task :all => [:chrome, :firefox]
end
