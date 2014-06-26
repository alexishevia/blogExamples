require 'json'

# ------------------------------ #
#         Config Values
# ------------------------------ #
#
# If you wish to override the default config values, create a JSON
# file called Vagrantfile.json on the same folder as this file
#

configValues = {
  # box to build from
  "box" => "Official Ubuntu 14.04 daily Cloud Image amd64 " +
           "(Development release, No Guest Additions)",

  # the url from where the 'config.vm.box' box will be fetched if it
  # doesn't already exist on the user's system
  "box_url" => "https://cloud-images.ubuntu.com/vagrant/trusty/"    +
               "current/trusty-server-cloudimg-amd64-vagrant-disk1" +
               ".box",

  # private IP address for the VM
  "ip" => '192.168.60.2'
}

if File.exist?('./Vagrantfile.json')
  begin
    configValues.merge!(JSON.parse(File.read('./Vagrantfile.json')))
  rescue JSON::ParserError => e
    puts "Error Parsing Vagrantfile.json", e.message
    exit 1
  end
end

# ------------------------------ #
#        Start Vagrant
# ------------------------------ #

Vagrant.configure("2") do |config|
  config.vm.box = configValues["box"]
  config.vm.box_url = configValues["box_url"]
  config.vm.network "private_network", ip: configValues['ip']
end
